# shortster
Shortcode Challenge

*	A user can submit a URL and receive a unique shortcode in response.
*	A user can submit a URL and shortcode and will receive the chosen shortcode if it is available.
*	A user can access a /<shortcode> endpoint and be redirected to the URL associated with that shortcode, if it exists. (frontend?)
*	All shortcodes can contain digits, upper case letters, and lowercase letters. It is case sensitive.
*	Automatically allocated shortcodes are exactly 6 characters long.
*	User submitted shortcodes must be at least 4 characters long.
*	A user can access a /<shortcode>/stats endpoint in order to see when the shortcode was registered, when it was last accessed, and how many times it was accessed.

## Back End
* Python
* Django / Django Rest Framework
* Pyjwt
* PostgreSQL / Psycopg
* Insomnia