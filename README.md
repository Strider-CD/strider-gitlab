# strider-gitlab

[![Greenkeeper badge](https://badges.greenkeeper.io/Strider-CD/strider-gitlab.svg)](https://greenkeeper.io/)

This plugin provides seamless integration between [Strider](https://github.com/Strider-CD/strider) and [GitLab](https://github.com/gitlabhq/gitlabhq). It enables you to add GitLab repositories to Strider and it hooks up necessary webhooks in order to automatically test on commits.

[![Build Status](https://travis-ci.org/Strider-CD/strider-gitlab.svg)](https://travis-ci.org/Strider-CD/strider-gitlab)

## Set Up
1. Install the plugin (can be done either from the Admin/Plugins section of the GUI or by running `bin/strider install gitlab`)
2. Click on your e-mail address in the top right corner of the GUI, then click "Account"
3. Click "GitLab" at the left of your screen
4. Add your information (the private token can be found in your account settings on GitLab)
5. Navigate to "Projects" in the Strider GUI. You should now see a tab with the name of your GitLab account

## Contributors
  * Martin Ericson (http://www.devbox.com)
  * [nodefourtytwo/strider-gitlab](https://github.com/nodefourtytwo/strider-gitlab)
  * [jonlil](https://github.com/jonlil)
  * [edy](https://github.com/edy)
  * [*others*](https://github.com/Strider-CD/strider-gitlab/graphs/contributors)

## License
The MIT License (MIT)

Copyright (c) 2014 Martin Ericson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
