import torch
import torch.nn as nn
from torchvision import models


def build_model(num_classes=38, freeze_base=True):
    # Load pre-trained EfficientNetB3
    model = models.efficientnet_b3(
        weights=models.EfficientNet_B3_Weights.DEFAULT
    )

    if freeze_base:
        # Freeze all layers except classifier
        for param in model.parameters():
            param.requires_grad = False

    # Replace the classifier head
    in_features = model.classifier[1].in_features

    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3, inplace=True),
        nn.Linear(in_features, 512),
        nn.ReLU(),
        nn.Dropout(p=0.2),
        nn.Linear(512, num_classes)
    )

    return model