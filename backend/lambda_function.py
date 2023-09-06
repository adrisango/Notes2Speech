import json
import boto3
import base64
from datetime import datetime

def lambda_handler(event, context):
    # Check if the event contains the image data
    body = json.loads(event['body'])

    image_data_base64 = body['image']
    
    image_data_bytes = base64.b64decode(image_data_base64)

    # Initialize AWS Rekognition, Translate, and Polly
    rekognition = boto3.client('rekognition')
    translate = boto3.client('translate')
    polly = boto3.client('polly')
    s3 = boto3.client('s3')


    # detect text with rekognition
    response = rekognition.detect_text(
        Image={
            'Bytes': image_data_bytes,
        }
    )


    detected_text = ''
    for item in response['TextDetections']:
        if item['Type'] == 'LINE':
            detected_text += item['DetectedText'] + '\n'
            
    print(detected_text)

    # SPANSIH TRANSLATION
    translated_response_spanish = translate.translate_text(Text=detected_text, SourceLanguageCode='auto', TargetLanguageCode='es')
    translated_text_spanish = translated_response_spanish['TranslatedText']

    # ENGLISH TRANSLATION
    translated_response_english = translate.translate_text(Text=detected_text, SourceLanguageCode='auto', TargetLanguageCode='en')
    translated_text_english = translated_response_english['TranslatedText']

    # TTS TO SPANISH AND ENGLISH
    voice_id_spanish = 'Mia' 
    voice_id_english = 'Brian' 

    response_spanish = polly.synthesize_speech(Text=translated_text_spanish, OutputFormat='mp3', VoiceId=voice_id_spanish)
    response_english = polly.synthesize_speech(Text=translated_text_english, OutputFormat='mp3', VoiceId=voice_id_english)
    
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

    # STORE TTS IN BUCKET
    target_bucket_name = 'csci5409notes2speech' 
    s3_key_spanish = f"sound_spanish_{timestamp}.mp3"
    s3_key_english = f"sound_english_{timestamp}.mp3"

    s3.upload_fileobj(response_spanish['AudioStream'], target_bucket_name, s3_key_spanish)
    s3.upload_fileobj(response_english['AudioStream'], target_bucket_name, s3_key_english)

    # PUBLIC URL TO ACCESS MP3
    s3_url_spanish = f"https://{target_bucket_name}.s3.amazonaws.com/{s3_key_spanish}"
    s3_url_english = f"https://{target_bucket_name}.s3.amazonaws.com/{s3_key_english}"

    # RESPONSE FOR MY FRONTEND REACT
    response_data = {
        'spanish_sound_url': s3_url_spanish,
        'english_sound_url': s3_url_english,
        'translated_text_spanish': translated_text_spanish,
        'translated_text_english': translated_text_english
    }


    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        'body': json.dumps(response_data)
    }
