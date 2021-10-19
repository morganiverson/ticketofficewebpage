
How to Add Resource Category?

	{
	"category": "Lowercase One Word Category Abbreviation",
	"title": "Displayed Category Title", 
	active: true, 
	"srcs": [...] 
	}

	To hide category:
	"active": false, 


How to Add Resource File, Link or Video?

 {
      "category": "Lowercase One Word Category Abbreviation",
      ...
      "srcs": [
        {
          "name": "Lowercase One Word Resource Abbreviation",
          "title": "Displayed Resource Title",
          "type": "1 = VIDEO, 2 = PDF, 3 = WEB LINK *unquoted numbers",
          "src": Link to media "
        }
      ]
    }

How to generate Resource src for Media?
	Google Drive Public Upload: 
	1. Upload File to Google Drive 
	2. Share publically and copy shairng Link
	3. Change 'view?us' to 'preview?us' 
	4. Change 'usp=sharing' with 'usp=drive_web'
	5. Remove 'https:'