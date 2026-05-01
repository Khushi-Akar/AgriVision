from mrjob.job import MRJob

class DiseaseFrequencyMR(MRJob):

    def mapper(self, _, line):
        try:
            # Skip header row
            if line.startswith('id,'):
                return
            
            row = line.strip().split(',')
            
            is_healthy = row[5].strip()
            
            if is_healthy == '0':  # diseased
                disease = row[2].strip()
                location = row[6].strip() if len(row) > 6 else 'Unknown'
                if location == '':
                    location = 'Unknown'
                yield (disease, location), 1
        except Exception as e:
            pass

    def reducer(self, key, values):
        yield key, sum(values)

if __name__ == '__main__':
    DiseaseFrequencyMR.run()