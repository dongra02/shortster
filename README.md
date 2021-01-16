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

With the User model functioning in Insomnia, I began work on the Shortcode model. I created fields I felt would address the user stories listed above. I included 2 methods on the model to increment the access_count and set the the last_access date when appropriate.

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

    def set_access_date(self):
        self.last_access = datetime.datetime.now()
```

With the model created I set about to create the views. I still have reservations about some of the naming conventions I selected, in retrospect I likely would have named the model something else so as to preserve shortcode. The views include list, stats and access views for a shortcode. A user, and only a user, has access to the list of their 'owned' shortcodes as well as the stats for a specific code. I added a third view for "access" to a code. This endpoint is accessbile to any user. Upon each request, the code's last_access and access_count fields are updated. The full_url is returned so the frontend can redirect the user to the proper site using a specified serializer.

```python
class CodeAccessView(CodeStatsView):
    ''' Requests to <short_url>/, redirect and inform stats '''

    def get(self, request, short_url):
        code = self.get_shortcode(short_url)
        code.add_access()
        code.set_access_date()
        code.save()
        serialized_code = CodeAccessSerializer(code)
        return Response(serialized_code.data, status=status.HTTP_200_OK)
```

## Front End
* Javascript
* React / react-router-dom
* Http-proxy-middleware

### Initial Wireframes

Landing
<div align='center'>
  <img src='./images/shortster_landing.png' width='50%'>
</div>
Home
<div align='center'>
  <img src='./images/shortster-home.png' width='50%'>
</div>
Stats
<div align='center'>
  <img src='./images/shortster_stats.png' width='50%'>
</div>

### Process

I began by boot-strapping with 'create-react-app' and utilized a template from my immersive course. In addition to the standard react files, this template includes 'http-proxy-middleware' and the proxySetup.js file included. I then installed 'react-router-dom' as well as Material UI. I have been tinkering with MUI a bit and wanted to work a little more with a basic ThemeProvider for this project. The default overrides are included in the theme.js file.

The first steps involved laying out the basic routes and component setup. Sticking with simple, this app should only need a user-forms component to handle login and registration, a home component for the list of shortcodes, as well as a stats compenent to view information for each shortcode. If a user is logged in, the landing page should display their codes with ability to view stats or access the code. If not logged in, users should only have option to log in or register for the application.

I opted to use state the App.js level, and thus have access to an 'isAuthenticated' prop through the app to dictate a users actions and views.