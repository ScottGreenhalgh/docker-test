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

driver.get('https://www.example.com/')
header_text = driver.find_element(By.XPATH, '//h1').text

print("example.com Header text is:")
print(header_text)

# driver.get("http://localhost:3000")
# header_text = driver.find_element_by_xpath('//h1').text

# print("Our Homepage Header text is:")
# print(header_text)

driver.quit()