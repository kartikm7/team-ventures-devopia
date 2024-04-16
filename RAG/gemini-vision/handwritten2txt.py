import google.generativeai as genai
from PIL import Image


genai.configure(api_key="AIzaSyBfMvikYUef6xxUi2wqOY6V88qbo0_8RP0")

def get_gemini_response(image):
    prompt = """
    RETURN THE FOLLOWING TWO THINGS TO ME: QUESTION AND ANSWER
    """
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([image, prompt])
    return response.text



image_pth = "D:/CODING/DEVOPIA/team-ventures-devopia/RAG/gemini-vision/646dc5b7fb9da46acab64901_handwrited.jpeg"
image_io = Image.open(image_pth)

x = get_gemini_response(image_io)
print(x)