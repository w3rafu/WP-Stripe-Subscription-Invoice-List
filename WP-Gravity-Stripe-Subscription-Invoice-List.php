<?php
/**
 * Plugin Name: Stripe Subscription Invoices List
 * Description: Display user Stripe Subscription invoices via shortcode.
 * Version: 0.1.1
 * Author: Rafael Fu
 * Author URI: mailto:hi@rafaelfu.me
 */

 //Create Shortcode [user-invoices]
add_shortcode('user-invoices', 'userInvoices');

//Get JS & CSS files
add_action('wp_enqueue_scripts', 'resources');
function resources(){
    global $post;
    if(has_shortcode( $post->post_content, 'user-invoices' )){
     wp_enqueue_script('request', plugins_url( 'request.js', __FILE__ ));
     wp_register_style('style', plugins_url( 'style.css', __FILE__ ));
     wp_enqueue_style('style');
    }
}

//Display Invoices
function userInvoices(){
    global $post;
    if(has_shortcode( $post->post_content, 'user-invoices' )){
    //Check if user is logged in
    if (is_user_logged_in()){
        //Get API key from WP
        $key = STRIPE_KEY;
        //Get current user object
        $current_user = wp_get_current_user();
        //If secret key is available
            if($key){
                return "<div id=\"invoice-list\">
                <strong id=\"invoice-message\">
                Loading invoices, please wait.</strong>
                </div>
                <script>
                    let user = \"$current_user->user_email\";
                    let key = \"$key\";
                    request(user, key)
                </script>
                ";
            } //Error, there is no secret key
            else {
                return 
                "<div id=\"invoice-list\">
                <p id=\"invoice-message\">
                Please define your API key in your wp-config file.</p>
                </div>
                ";
            }
        //If user is not logged in.
        } else {
            return "<p>Please log-in.</p>";
        }
        
    } else{
        return null;
    }
    }




