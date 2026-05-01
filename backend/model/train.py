import torch
import torch.nn as nn
from torch.optim import Adam
from torch.optim.lr_scheduler import StepLR

from preprocess import get_dataloaders
from efficientnet import build_model


DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
DATA_DIR = "../data/PlantVillage"

EPOCHS = 20
LR = 1e-3


def train():
    train_loader, val_loader, classes = get_dataloaders(DATA_DIR)

    model = build_model(num_classes=len(classes), freeze_base=True).to(DEVICE)

    criterion = nn.CrossEntropyLoss()
    optimizer = Adam(
        filter(lambda p: p.requires_grad, model.parameters()),
        lr=LR
    )
    scheduler = StepLR(optimizer, step_size=7, gamma=0.1)

    best_acc = 0.0

    for epoch in range(EPOCHS):
        model.train()

        running_loss = 0.0
        correct = 0
        total = 0

        for images, labels in train_loader:
            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            optimizer.zero_grad()

            outputs = model(images)
            loss = criterion(outputs, labels)

            loss.backward()
            optimizer.step()

            running_loss += loss.item()

            _, preds = outputs.max(1)
            correct += preds.eq(labels).sum().item()
            total += labels.size(0)

        train_acc = correct / total

        model.eval()

        val_correct = 0
        val_total = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images = images.to(DEVICE)
                labels = labels.to(DEVICE)

                outputs = model(images)
                _, preds = outputs.max(1)

                val_correct += preds.eq(labels).sum().item()
                val_total += labels.size(0)

        val_acc = val_correct / val_total

        print(
            f"Epoch {epoch + 1}/{EPOCHS} | "
            f"Loss: {running_loss:.3f} | "
            f"Train Acc: {train_acc:.3f} | "
            f"Val Acc: {val_acc:.3f}"
        )

        if val_acc > best_acc:
            best_acc = val_acc
            torch.save(model.state_dict(), "../../models/best_model.pth")
            print(f" -> Model saved (best acc: {best_acc:.3f})")

        scheduler.step()

    print("\nUnfreezing all layers for fine-tuning...")

    for param in model.parameters():
        param.requires_grad = True

    optimizer = Adam(model.parameters(), lr=1e-4)

    for epoch in range(5):
        model.train()

        for images, labels in train_loader:
            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            optimizer.zero_grad()

            outputs = model(images)
            loss = criterion(outputs, labels)

            loss.backward()
            optimizer.step()

        model.eval()

        val_correct = 0
        val_total = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images = images.to(DEVICE)
                labels = labels.to(DEVICE)

                outputs = model(images)
                _, preds = outputs.max(1)

                val_correct += preds.eq(labels).sum().item()
                val_total += labels.size(0)

        val_acc = val_correct / val_total

        print(f"Fine-tune Epoch {epoch + 1}/5 | Val Acc: {val_acc:.3f}")

        if val_acc > best_acc:
            best_acc = val_acc
            torch.save(model.state_dict(), "../../models/best_model.pth")
            print(f" -> Model saved (best acc: {best_acc:.3f})")

    print(f"\nTraining complete. Best Val Accuracy: {best_acc:.3f}")


if __name__ == "__main__":
    train()