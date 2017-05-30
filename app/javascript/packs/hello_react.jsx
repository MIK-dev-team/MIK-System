// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import Hello from 'components/hello';
import Basic from 'components/basic';
import WebpackerReact from 'webpacker-react';

WebpackerReact.setup({Hello, Basic});
