from openai import OpenAI
from dotenv import load_dotenv
import os, json
import boto3
from decimal import Decimal


load_dotenv()

# initialize openAI client
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI()

# initialize dynamodb client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('contra_costco')


def insert_item():
    for _ in range(33):
        system_content = f"You have a great sense of humor who outputs responses in JSON format.  For this and future requests we will be generating a database of funny products for a sarcastic parody store called Contra Costco.  Based on the 80's arcade game Contra, this e-commerce grocery store exclusively sells over-the-top, comical items that a 80's jungle freedom fighter would need.  Some examples: Rapid Fire Banana Launcher, Explosive Energy Drinks, Pixel Power Camoflauge Clothing.  Please try not to make the same items over and over, and don't use same product names.  Avoid using the same words, IE 'Guerilla' multiple times.  For the returned JSON data please always use these specific keys: product_name, product_description, product_price, product_features, product_rating, product_reviews, product_use_cases, product_tags, product_categories.  Please use the following values for the keys: product_name: string, product_description: string, product_price: string, product_features: list, product_rating: string, product_reviews: list, product_use_cases: list, product_tags: list, product_categories: list."

        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": system_content},
                {"role": "user", "content": "What is the product name?"},
                {"role": "user", "content": "What is the product description?"},
                {"role": "user", "content": "What is the product price?"},
                {"role": "user", "content": "What are the product features? Please give three features."},
                {"role": "user", "content": "What is the product rating? Please give a rating between 1 and 5."},
                {"role": "user", "content": "What are the product reviews? Please give three reviews."},
                {"role": "user", "content": "What are the product use cases? Please give three use cases."},
                {"role": "user", "content": "What are the product tags? Please give three tags."},
                {"role": "user", "content": "What are the product categories? Please give three categories."},
            ],
        )
    

        for choice in response.choices:

                try:
                    content = json.loads(choice.message.content)
                except json.JSONDecodeError:
                    print(f"Failed to parse JSON content: {choice.message.content}")
                    continue
                # Assuming 'content' is now a dictionary
                print(f"content: {content}")

        # Save the brand to the database
        print(f"")
        print(f"Saving {content['product_name']} to database...")

       

        # write to dynamodb
        table.put_item(
                Item={
                    'product_name': content['product_name'],
                    'product_description': content['product_description'],
                    'product_price': content['product_price'],
                    'product_features': content['product_features'],
                    'product_rating': content['product_rating'],
                    'product_reviews': content['product_reviews'],
                    'product_use_cases': content['product_use_cases'],
                    'product_tags': content['product_tags'],
                    'product_categories': content['product_categories']
                }
            )



if __name__ == "__main__":
    insert_item()
    print("All items inserted successfully.")
    



