import torch
from torchvision import models, transforms
from PIL import Image
from captum.attr import LayerGradCam
import io

# Load pretrained ResNet
model = models.resnet18(pretrained=True)
model.eval()

# Preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def analyze_neurons(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    input_tensor = transform(image).unsqueeze(0)
    input_tensor.requires_grad_()

    target_layer = model.layer4[1].conv2
    gradcam = LayerGradCam(model, target_layer)
    attributions = gradcam.attribute(input_tensor, target=243)  # Target class = "bull mastiff" (example)

    return attributions.squeeze().detach().numpy()
