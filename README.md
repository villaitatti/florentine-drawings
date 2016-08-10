# Florenting Drawings
Blacklight Rails app for the Itatti Berenson portal

Make sure you have Ruby 2.2.0 and 4.2.6+ installed

```
git clone https://github.com/villaitatti/florentine-drawings.git
```

```
bundle install
```

To index the data, make sure solr is running and:
```
rake itatti:index
```

And start the server in development:
```
rails server
```

To control the IP and port:
```
rails server --binding=123.456.789.321 -p 80
```
