from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.select import Select

from PIL import Image

import os, json
from selenium import webdriver

options = webdriver.ChromeOptions()
settings = {"recentDestinations": [{"id": "Save as PDF", "origin": "local", "account": ""}], "selectedDestinationId": "Save as PDF", "version": 2}
prefs = {'printing.print_preview_sticky_settings.appState': json.dumps(settings)}
options.add_experimental_option('prefs', prefs)
options.add_argument('--kiosk-printing')

# options.add_argument('--headless')

driver = webdriver.Chrome('./chromedriver', options=options)


# driver.get("https://morganiverson.github.io/ticketoffice/contact")
# driver.get("http://127.0.0.1:5500/contact.html")
# driver.get('http://localhost:3000/contact.html')
driver.get("http://iverson-emueagles.rf.gd/contact.html")
# driver.maximize_window()

name_input = driver.find_element_by_id('sender')
name_input.send_keys("Morgan Iverson")

email_input = driver.find_element_by_id('email')
email_input.send_keys("miverson@emich.edu")

selector = Select(driver.find_element_by_id('reason'))
selector.select_by_value("Other")

message = driver.find_element_by_id('message')
message.send_keys("Test Message\nTest Message\nTest Message\nTest Message\n")

submit_button = driver.find_element_by_id('send-form')
submit_button.click()

ss_name = 'contact_test_results_' + str(len([name for name in os.listdir('results') if os.path.isfile(name)])) + '.png'

# driver.save_screenshot(ss_name)
# screenshot = Image.open(ss_name)
# screenshot.show()
# # driver.execute_script('window.print()')

# driver.close()


 