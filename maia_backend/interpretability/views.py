from rest_framework.views import APIView
from rest_framework.response import Response
from .neuron_analyzer import analyze_neurons

import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import io
import base64
from PIL import Image


def generate_overlay_heatmap(heatmap, original_image_bytes):
    original_image = Image.open(io.BytesIO(original_image_bytes)).convert("RGB").resize((224, 224))
    image_np = np.array(original_image) / 255.0

    # Normalize and resize heatmap
    heatmap = np.array(heatmap)
    heatmap = np.maximum(heatmap, 0)
    heatmap = heatmap / np.max(heatmap)
    heatmap_img = Image.fromarray(np.uint8(255 * heatmap)).resize((224, 224)).convert("L")
    heatmap_np = np.array(heatmap_img)

    # Create figure
    fig, ax = plt.subplots()
    ax.imshow(image_np)
    heatmap_plot = ax.imshow(heatmap_np, cmap='jet', alpha=0.5)
    plt.colorbar(heatmap_plot, ax=ax, fraction=0.046, pad=0.04, label="Neuron Activation Level")
    ax.axis("off")

    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    base64_image = base64.b64encode(buf.read()).decode('utf-8')
    plt.close(fig)

    return base64_image


class NeuronAnalysisView(APIView):
    def post(self, request):
        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"error": "No image uploaded"}, status=400)

        image_bytes = image_file.read()

        # Analyze the neuron and get a heatmap matrix
        heatmap_matrix = analyze_neurons(image_bytes)

        # Generate base64 heatmap image (with legend + overlay)
        heatmap_base64 = generate_overlay_heatmap(heatmap_matrix, image_bytes)

        # Encode the original image as base64
        original_base64 = base64.b64encode(image_bytes).decode('utf-8')

        # Optional delta calculation
        delta = float(np.mean(np.abs(heatmap_matrix)))

        return Response({
            "original_image_base64": original_base64,
            "heatmap_base64": heatmap_base64,
            "delta": delta
        })




from .bias_detector import compare_bias

class BiasDetectionView(APIView):
    def post(self, request):
        img1 = request.FILES.get("image1")
        img2 = request.FILES.get("image2")

        if not img1 or not img2:
            return Response({"error": "Upload two images"}, status=400)

        result = compare_bias(img1.read(), img2.read())
        class_names = result["class_names"]

        pred1_idx = result["prediction_1"]
        pred2_idx = result["prediction_2"]

        prediction_1_class = class_names[pred1_idx] if pred1_idx < len(class_names) else "Unknown"
        prediction_2_class = class_names[pred2_idx] if pred2_idx < len(class_names) else "Unknown"

        confidence_1 = result.get("confidence_1", 0.0)
        confidence_2 = result.get("confidence_2", 0.0)

        comparison_text = (
            f"Prediction 1: {prediction_1_class} with confidence {confidence_1:.2f}\n"
            f"Prediction 2: {prediction_2_class} with confidence {confidence_2:.2f}\n"
            f"Bias Detected: {'Yes' if result['bias_detected'] else 'No'}"
        )

        return Response({
            "biasComparison": comparison_text,
            "prediction_1_class": prediction_1_class,
            "prediction_2_class": prediction_2_class,
            "confidence_1": confidence_1,
            "confidence_2": confidence_2,
            "bias_detected": result["bias_detected"]
        })





from .summarizer import summarize_analysis

class SummaryView(APIView):
    def post(self, request):
        content = request.data.get("text")
        if not content:
            return Response({"error": "No text provided"}, status=400)

        summary = summarize_analysis(content)
        return Response({"summary": summary})



from .feature_visualizer import visualize_feature_importance


class FeatureImportanceView(APIView):
    def post(self, request):
        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"error": "No image uploaded"}, status=400)

        # Get the feature importance data
        result = visualize_feature_importance(image_file.read())

        features = result.get("features", [])
        importance_scores = result.get("importance_scores", [])

        if not features or not importance_scores:
            return Response({"error": "No feature importance data available"}, status=400)

        # Create a bar chart for feature importance
        fig, ax = plt.subplots(figsize=(10, 6))
        ax.barh(features, importance_scores, color='skyblue')
        ax.set_xlabel('Importance Score')
        ax.set_ylabel('Features')
        ax.set_title('Feature Importance')

        # Save the figure to a buffer
        buf = io.BytesIO()
        plt.tight_layout()
        plt.savefig(buf, format="png")
        buf.seek(0)

        # Convert the image to base64
        heatmap_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        buf.close()

        # Return the base64-encoded image and importance score
        return Response({
            "heatmap_base64": heatmap_base64,
            "importanceScores": result.get("delta", "N/A"),  # Include delta as importance score if available
            "features": features,
            "importance_scores": importance_scores
        })






