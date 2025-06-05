from transformers import pipeline

# Safe model choice
summarizer = pipeline("summarization", model="google/pegasus-xsum")

def summarize_analysis(text):
    # Truncate input to about 1024 characters
    max_input_chars = 1024
    text = text[:max_input_chars]

    try:
        summary = summarizer(text, max_length=100, min_length=30, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        return f"Error generating summary: {str(e)}"
