from django.urls import path
from .views import NeuronAnalysisView,BiasDetectionView,SummaryView,FeatureImportanceView

urlpatterns = [
    path('analyze/', NeuronAnalysisView.as_view()),
    path('bias-detect/', BiasDetectionView.as_view()),
    path('summarize/', SummaryView.as_view()),
    path('feature-importance/', FeatureImportanceView.as_view()),


]
