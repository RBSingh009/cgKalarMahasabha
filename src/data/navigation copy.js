// src/data/navigation.js

export const navLinks = [
  {
    label: "Home",
    href: "/",
    // children: [
    //   { label: 'Home 1', href: '/' },
    //   { label: 'Home 2', href: '/index-2' },
    //   { label: 'Home 3', href: '/index-3', badge: 'New' },
    // ],
  },
  { label: "About Us", href: "/about" },
  {
    label: "Our Members",
    href: "/members",
    children: [
      { label: "Orginization", href: "/Orginization" },
      { label: "Community", href: "/Community" },
    ],
  },
  {
    label: "Gallery",
    href: "#",
    children: [
      { label: "Folder 0", href: "/gallery" },
      { label: "Folder 1", href: "/gallery" },
      { label: "Folder 2", href: "/gallery-2" },
    ],
    //   {
    //     label: 'Gallery',
    //     href: '/gallery',
    //     header: 'Our Gallery',
    //     children: [
    //       { label: 'Folder 1', href: '/gallery' },
    //       { label: 'Folder 2', href: '/gallery-2' },
    //     ],
    //   },
    //   {
    //     label: 'Events',
    //     href: '/event',
    //     children: [
    //       { label: 'Events', href: '/event' },
    //       { label: 'Single Events', href: '/single-event' },
    //     ],
    //   },
    //   {
    //     label: 'Shop',
    //     href: '#',
    //     header: 'Shop Pages',
    //     children: [
    //       { label: 'Shop', href: '/shop' },
    //       { label: 'Product Details', href: '/single-product' },
    //       { label: 'Cart', href: '/cart' },
    //       { label: 'Checkout', href: '/checkout' },
    //       { label: 'Login', href: '/login' },
    //       { label: 'Register', href: '/register' },
    //     ],
    //   },
    //   { label: 'Our Work', href: '/work' },
  },
  {
    label: "Our Work",
    href: "/work",
    // children: [
    //   { label: 'Blog Grid 01', href: '/blog' },
    //   { label: 'Blog Grid 02', href: '/blog-2' },
    //   { label: 'Blog Standard', href: '/blog-standard' },
    //   {
    //     label: 'Blog Details',
    //     href: '/blog',
    //     header: 'Blog Single',
    //     children: [
    //       { label: 'Single Post 01', href: '/single-post' },
    //       { label: 'Single Post 02', href: '/single-post-2' },
    //     ],
    //   },
    // ],
  },
  { label: "Contact Us", href: "/contact" },
];

export const canvasLinks = [
  { label: "About Us", href: "/about" },
  { label: "Become a Volunteer", href: "/volunteer" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Members", href: "/members" },
  { label: "Our Work", href: "/work" },
  { label: "Contact Us", href: "/contact" },
];
