# Shortster

## Brief and User Stories

At MovingWorlds we're looking forward to launching an URL shortening service, so that users may have custom URLs to their long URLs.

Specs:
*	A user can submit a URL and receive a unique shortcode in response.
*	A user can submit a URL and shortcode and will receive the chosen shortcode if it is available.
*	A user can access a /<shortcode> endpoint and be redirected to the URL associated with that shortcode, if it exists.
*	All shortcodes can contain digits, upper case letters, and lowercase letters. It is case sensitive.
*	Automatically allocated shortcodes are exactly 6 characters long.
*	User submitted shortcodes must be at least 4 characters long.
*	A user can access a /<shortcode>/stats endpoint in order to see when the shortcode was registered, when it was last accessed, and how many times it was accessed.

Assumptions:
* As I have not had experience creating shortcodes, I opted to generate strings that met the requirements listed so as to focus on creating a functional application.
* Clicks/Access of shortcodes, for the purpose of informing the stats endpoint, will be considered as requests to that specific shortcode object.

## Back End
* Python
* Django / Django Rest Framework
* Pyjwt
* PostgreSQL / Psycopg
* Insomnia

### Initial Database
<div align='center'>
<img src='./images/initial-db.png'>
</div>

### Process

I began by laying out a very basic backend and database model. I boot-strapped this with 'django-admin startproject.' With the basic file structure I adjusted the database settings to use PostgreSQL. Additionaly, I created an Insomnia workspace to begin testing the endpoints and validations.

The first model I created was the User model. For this, I utlized the Pyjwt library to handle webtoken encoding/decoding as well as Django Rest Frameworks built in authentication. With the code below, I am able to validate the token and format, as well as store the user info in the request to be accessed down the line. 

```python
class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        header = request.headers.get('Authorization')
        if not header:
            return None
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail='Invalid Auth Token Format')

        token = header.replace('Bearer ', '')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid Auth Token')
        except User.DoesNotExist:
            raise PermissionDenied(detail='User Not Found')

        return (user, token)
```

Keeping a goal of simple and straightfoward, I created only register and log in views/urls for the User model. In a more robust product, I would create additional model fields as well as views for users to maintian profiles along with the potential for other features.

With the User model functioning in Insomnia, I began work on the Shortcode model. I created fields I felt would address the user stories listed above.

```python
class Shortcode(models.Model):
    full_url = models.CharField(max_length=2000)
    short_url = models.CharField(max_length=100, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    last_access = models.DateTimeField(null=True, blank=True)
    access_count = models.IntegerField(default=0)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='short_urls',
        on_delete=models.CASCADE
    )

    def add_access(self):
        self.access_count += 1
```

I included a method on the model to increment the access_count property to inform the /stats endpoint. The last_access date will be set upon each access (get request) directed to a particular collection member.