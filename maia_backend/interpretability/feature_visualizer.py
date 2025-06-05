

from torchvision import models, transforms
from PIL import Image
import torch
import io
import numpy as np
from captum.attr import IntegratedGradients
import base64
from matplotlib.cm import get_cmap

# Load pretrained model
model = models.resnet18(pretrained=True)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # Normalization for ResNet
])

def visualize_feature_importance(image_bytes):
    # Open the image and preprocess it
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        print("Image loaded successfully")
    except Exception as e:
        print(f"Error loading image: {e}")
        return {"error": "Error loading image"}

    input_tensor = transform(image).unsqueeze(0)
    input_tensor.requires_grad_()

    print("Image transformed and tensor created")

    def forward_func(x):
        return model(x)

    # Apply Integrated Gradients to compute attributions
    try:
        ig = IntegratedGradients(forward_func)
        attributions, delta = ig.attribute(input_tensor, target=243, return_convergence_delta=True)  # Target class: 243 is 'cable'
       
    except Exception as e:
        
        return {"error": "Error in calculating feature importance"}

    # Convert attributions to numpy and process
    attributions = attributions.squeeze().detach().numpy()
    attributions = np.mean(attributions, axis=0)  # Average over RGB channels

    

    # Normalize and convert to colormap
    attributions = (attributions - attributions.min()) / (attributions.max() - attributions.min() + 1e-7)
    cmap = get_cmap("hot")
    colored = cmap(attributions)

    # Convert to image
    heatmap = Image.fromarray((colored[:, :, :3] * 255).astype(np.uint8))

    # Now create features that match the importance scores' shape
    feature_height, feature_width = attributions.shape
    features = [f"Feature {i}" for i in range(feature_height * feature_width)]  # Flattened feature names
    importance_scores = attributions.flatten().tolist()  # Flattened attributions as importance scores

    

    # Select top 10 features based on importance scores
    top_10_indices = np.argsort(importance_scores)[::-1][:10]  # Sort and get top 10 indices
    top_10_features = [features[i] for i in top_10_indices]
    top_10_scores = [importance_scores[i] for i in top_10_indices]

    

    # Convert to base64 string for web display
    buffer = io.BytesIO()
    heatmap.save(buffer, format="PNG")
    heatmap_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    

    return {
        "heatmap_base64": heatmap_base64,
        "delta": delta.squeeze().item(),
        "features": top_10_features,
        "importance_scores": top_10_scores
    }
