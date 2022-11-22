# WP Stripe Subscriptions List

A WordPress plugin to display Stripe Subscriptions invoices for your subscribers. This is useful to give your subscribers direct links to the stripe PDF's invoices directly from your website.

## Installation

1. Add your Stripe API key to your **wp-config.php** file:

```php
define ('STRIPE_KEY', 'YOUR KEY HERE');
```

1. Download and upload the plugin to your WordPress site.

## Usage/Examples

Use shortcode **[user-invoices]** to display invoices.

## FAQ

### Basic Requirements

WordPress and registered users.
The plugin uses the current logged in user email to request Stripe Invoices.
If there are subscriptions, the shortcode returns a link for each invoice available.

### Privacy

You must be logged-in in WordPress to make a call.

## Roadmap

- Improve/Upgrade Sintax
- Basic Shortcode Options
- Advanced Shortcode Options
- Pagination

## Feedback

Reach to rafa@webcomply.org

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

Contributions are always welcome!
