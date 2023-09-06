# Notes2Speech

**Notes2Speech** is a project developed with a primary focus on utilizing Amazon Web Services (AWS) cloud services and harnessing the power of AWS CloudFormation for automatic service provisioning. The core objective of this project is to simplify the conversion of handwritten study notes into digital formats.

Notes2Speech simplifies the process of turning handwritten notes into digital text. Users upload images of their handwritten notes, and the system handles the conversion, transforming these images into digital text. What sets this project apart is its bilingual support, as it can provide text in both English and Spanish. Additionally, it generates audio files in both languages, allowing users to listen to the content of their notes, which can be a helpful study aid.

By automating the setup and management of these AWS services through AWS CloudFormation, Notes2Speech ensures a robust, scalable, and hands-free infrastructure.
## Target Users

The primary audience for Notes2Speech is students who frequently take handwritten notes but desire digital accessibility. It's particularly useful for students at various educational levels looking to enhance their study methods and convenience.

## AWS Cloud-Powered

Notes2Speech leverages a range of AWS cloud services, all orchestrated through AWS CloudFormation, to provide a seamless user experience:

### Computing
- **AWS EC2**: AWS Elastic Compute Cloud (EC2) instance to host the React frontend.

### Networking
- **AWS Lambda**: AWS Lambda functions handle the logic to convert the notes images to text and audio, and to translate them.
- **AWS API Gateway**: Secure communication between the application and users through HTTP APIs.

### Storage
- **AWS S3**: Amazon Simple Storage Service (S3) plays a crucial role in storing and managing the images and converted text efficiently, ensuring durability and accessibility.
- **AWS Rekognition**: This service enhances image analysis capabilities, facilitating precise text extraction from images.

### Language and Audio
- **AWS Translate**: AWS Translate to provide bilingual support by translating text between English and Spanish.
- **AWS Polly**: AWS Polly generates natural-sounding audio from text, enhancing the auditory learning experience.
