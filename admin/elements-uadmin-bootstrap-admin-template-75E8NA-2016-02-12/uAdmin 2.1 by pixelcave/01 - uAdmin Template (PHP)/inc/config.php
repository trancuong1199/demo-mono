<?php
/**
 * config.php
 *
 * Author: pixelcave
 *
 * Configuration php file. It contains variables used in the template
 *
 */

// Template variables
$template = array(
    'name'        => 'uAdmin',
    'version'     => '2.1',
    'author'      => 'pixelcave',
    'title'       => 'uAdmin - Professional, Responsive and Flat Admin Template',
    'description' => 'uAdmin is a Professional, Responsive and Flat Admin Template created by pixelcave and published on Themeforest',
    'header'      => '', // 'fixed-top', 'fixed-bottom'
    'layout'      => '', // 'fixed'
    'theme'       => '', // 'deepblue', 'deepwood', 'deeppurple', 'deepgreen', '' empty for default
    'active_page' => basename($_SERVER['PHP_SELF'])
);

// Primary navigation array (the primary navigation will be created automatically based on this array)
$primary_nav = array(
    array(
        'name'  => 'Dashboard',
        'url'   => 'index.php',
        'icon'  => 'fa fa-fire'
    ),
    array(
        'name'  => 'UI Elements',
        'icon'  => 'fa fa-glass',
        'url'   => 'page_ui_elements.php'
    ),
    array(
        'name'  => 'Typography',
        'url'   => 'page_typography.php',
        'icon'  => 'fa fa-font'
    ),
    array(
        'name'  => 'Forms',
        'icon'  => 'fa fa-th-list',
        'sub'   => array(
            array(
                'name'  => 'Components',
                'url'   => 'page_form_components.php',
                'icon'  => 'fa fa-file-text'
            ),
            array(
                'name'  => 'Validation',
                'url'   => 'page_form_validation.php',
                'icon'  => 'fa fa-exclamation-triangle'
            ),
            array(
                'name'  => 'Wizard',
                'url'   => 'page_form_wizard.php',
                'icon'  => 'fa fa-magic'
            ),
            array(
                'name'  => 'Masked Inputs',
                'url'   => 'page_form_masked.php',
                'icon'  => 'fa fa-flask'
            )
        )
    ),
    array(
        'name'  => 'Tables',
        'icon'  => 'fa fa-table',
        'sub'   => array(
            array(
                'name'  => 'Styles',
                'url'   => 'page_tables.php',
                'icon'  => 'fa fa-tint'
            ),
            array(
                'name'  => 'DataTables',
                'url'   => 'page_datatables.php',
                'icon'  => 'fa fa-th'
            ),
            array(
                'name'  => 'Editable DataTables',
                'url'   => 'page_datatables_editable.php',
                'icon'  => 'fa fa-pencil'
            )
        )
    ),
    array(
        'name'  => 'Components',
        'icon'  => 'fa fa-leaf',
        'sub'   => array(
            array(
                'name'  => 'CSS3 Animations',
                'url'   => 'page_animations.php',
                'icon'  => 'fa fa-certificate animation-pulse'
            ),
            array(
                'name'  => 'Gallery',
                'url'   => 'page_gallery.php',
                'icon'  => 'fa fa-picture-o'
            ),
            array(
                'name'  => 'Inbox',
                'url'   => 'page_inbox.php',
                'icon'  => 'fa fa-envelope'
            ),
            array(
                'name'  => 'ChatUI',
                'url'   => 'page_chatui.php',
                'icon'  => 'fa fa-comments'
            ),
            array(
                'name'  => 'Charts',
                'url'   => 'page_charts.php',
                'icon'  => 'fa fa-bar-chart-o'
            ),
            array(
                'name'  => 'Calendar',
                'url'   => 'page_calendar.php',
                'icon'  => 'fa fa-calendar'
            ),
            array(
                'name'  => 'Maps',
                'url'   => 'page_maps.php',
                'icon'  => 'fa fa-map-marker'
            ),
            array(
                'name'  => 'Syntax Highlighting',
                'url'   => 'page_syntax_highlighting.php',
                'icon'  => 'fa fa-flask'
            )
        )
    ),
    array(
        'name'  => 'Icons',
        'icon'  => 'fa fa-tint',
        'sub'   => array(
            array(
                'name'  => 'Glyphicons Pro',
                'url'   => 'page_glyphicons_pro.php',
                'icon'  => 'gi gi-heart'
            ),
            array(
                'name'  => 'FontAwesome',
                'url'   => 'page_fontawesome.php',
                'icon'  => 'fa fa-gift'
            ),
            array(
                'name'  => 'Gemicon',
                'url'   => 'page_gemicon.php',
                'icon'  => 'fa fa-smile-o'
            )
        )
    ),
    array(
        'name'  => 'Pages',
        'icon'  => 'fa fa-file-o',
        'sub'   => array(
            array(
                'name'  => 'Search Results',
                'url'   => 'page_search_results.php',
                'icon'  => 'fa fa-search'
            ),
            array(
                'name'  => 'Price Tables',
                'url'   => 'page_price_tables.php',
                'icon'  => 'fa fa-ticket'
            ),
            array(
                'name'  => 'Forum',
                'url'   => 'page_forum.php',
                'icon'  => 'fa fa-comment'
            ),
            array(
                'name'  => 'Article',
                'url'   => 'page_article.php',
                'icon'  => 'fa fa-pencil'
            ),
            array(
                'name'   => 'Invoice',
                'url'   => 'page_invoice.php',
                'icon'  => 'fa fa-book'
            ),
            array(
                'name'  => 'Profile',
                'url'   => 'page_profile.php',
                'icon'  => 'fa fa-user'
            ),
            array(
                'name'  => 'FAQ',
                'url'   => 'page_faq.php',
                'icon'  => 'fa fa-flag'
            ),
            array(
                'name'  => 'Errors',
                'url'   => 'page_errors.php',
                'icon'  => 'fa fa-exclamation-triangle'
            ),
            array(
                'name'  => 'Blank',
                'url'   => 'page_blank.php',
                'icon'  => 'fa fa-circle-o'
            )
        )
    ),
    array(
        'name'  => 'Login Page',
        'url'   => 'page_login.php',
        'icon'  => 'fa fa-power-off'
    ),
    array(
        'name'  => 'Landing Page',
        'url'   => 'page_landing.php',
        'icon'  => 'fa fa-rocket'
    )
);