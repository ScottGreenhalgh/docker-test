from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By 

# Define options for running ChromeDriver
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-dev-shm-usage")

# Initialize a new Chrome driver instance
driver = webdriver.Chrome(options=chrome_options)

def check_header_text(url, xpath='//h1'):
    driver.get(url)
    try:
        header_text = driver.find_element(By.XPATH, xpath).text
        print(f"Header for {url}: {header_text}")
    except Exception as e:
        print(f"Could not find header for {url}: {e}")

# List of pages to test
pages_to_test = [
    "https://www.example.com/",
    "http://localhost:3000",
    "http://localhost:3000/page2"
]

# Loop through each page and check the header
for page in pages_to_test:
    check_header_text(page)

driver.quit()