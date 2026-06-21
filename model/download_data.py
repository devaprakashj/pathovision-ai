from roboflow import Roboflow

rf = Roboflow(api_key="R8FMaPoYSNTZ8c7cw4aa")
project = rf.workspace("equinecytology").project("cell_classification-gvhkn")
version = project.version(1)
dataset = version.download("folder")

print(f"Dataset downloaded to: {dataset.location}")
