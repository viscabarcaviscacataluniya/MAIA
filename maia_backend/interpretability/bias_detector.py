from torchvision import models, transforms
from PIL import Image
import torch
import io
import torch.nn.functional as F
import urllib.request

# Load pretrained model
model = models.resnet18(pretrained=True)
model.eval()

# Download and load ImageNet class names
imagenet_url = "https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt"
with urllib.request.urlopen(imagenet_url) as f:
    class_names = [line.strip().decode("utf-8") for line in f.readlines()]

# Preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def get_prediction(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    tensor = transform(image).unsqueeze(0)
    outputs = model(tensor)
    probabilities = F.softmax(outputs, dim=1)
    confidence, predicted = torch.max(probabilities, 1)
    return predicted.item(), confidence.item()

def compare_bias(image_bytes_1, image_bytes_2):
    pred1, conf1 = get_prediction(image_bytes_1)
    pred2, conf2 = get_prediction(image_bytes_2)

    return {
        "prediction_1": pred1,
        "prediction_2": pred2,
        "confidence_1": conf1,
        "confidence_2": conf2,
        "bias_detected": pred1 != pred2,
        "class_names": class_names
    }
