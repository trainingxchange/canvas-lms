(function() {
  define(['react', '../mixins/BackboneMixin', '../utils/withGlobalDom', './FriendlyDatetime', 'compiled/util/friendlyBytes'], function(React, BackboneMixin, withGlobalDom, FriendlyDatetime, friendlyBytes) {
    var EVERYTHING_BEFORE_THE_FIRST_SLASH, FolderChild;

    EVERYTHING_BEFORE_THE_FIRST_SLASH = /^[^\/]+/;
    return FolderChild = React.createClass({
      mixins: [BackboneMixin('model')],
      folderHref: function() {
        return this.props.baseUrl + 'folder' + this.props.model.get('full_name').replace(EVERYTHING_BEFORE_THE_FIRST_SLASH, '');
      },
      render: withGlobalDom(function() {
        var _ref, _ref1;

        return div({
          className: 'ef-item-row'
        }, div({
          className: 'ef-name-col'
        }, (this.props.model.get('display_name') ? a({
          href: this.props.model.get('url')
        }, (this.props.model.get('thumbnail_url') ? img({
          src: this.props.model.get('thumbnail_url'),
          className: 'ef-thumbnail',
          alt: ''
        }) : i({
          className: 'icon-document'
        })), this.props.model.get('display_name')) : a({
          href: this.folderHref()
        }, i({
          className: 'icon-folder'
        }), this.props.model.get('name')))), div({
          className: 'ef-date-modified-col'
        }, FriendlyDatetime({
          datetime: this.props.model.get('updated_at')
        })), div({
          className: 'ef-modified-by-col'
        }, a({
          href: (_ref = this.props.model.get('user')) != null ? _ref.html_url : void 0
        }, (_ref1 = this.props.model.get('user')) != null ? _ref1.display_name : void 0)), div({
          className: 'ef-size-col'
        }, friendlyBytes(this.props.model.get('size'))), div({
          className: 'ef-links-col'
        }, span({
          'data-module-type': 'assignment',
          'data-content-id': '6',
          'data-id': '6',
          'data-course-id': '4',
          'data-module-id': '3',
          'data-module-item-id': '3',
          'data-published': 'true',
          'data-publishable': 'true',
          'data-unpublishable': 'true',
          className: 'publish-icon published publish-icon-published',
          role: 'button',
          tabIndex: '0',
          'aria-pressed': 'true',
          title: 'Published',
          'aria-describedby': 'ui-tooltip-1',
          'aria-label': 'Published. Click to unpublish.'
        }, i({
          className: 'icon-publish'
        }), span({
          className: 'publish-text',
          tabIndex: '-1'
        }, ' Published'), span({
          className: 'screenreader-only accessible_label'
        }, 'Published. Click to unpublish.'), span({
          className: 'screenreader-only accessible_label'
        }, 'Published. Click to unpublish.'), span({
          className: 'screenreader-only accessible_label'
        }, 'Published. Click to unpublish.')), div({
          className: 'ef-hover-options'
        }, a({
          herf: '#',
          style: {
            'color': 'black',
            'margin-right': '10px'
          }
        }, i({
          className: 'icon-download'
        })), div({
          className: 'ef-admin-gear'
        }, div(null, a({
          className: 'al-trigger al-trigger-gray',
          role: 'button',
          'aria-haspopup': 'true',
          'aria-owns': 'content-1',
          'aria-label': 'Settings',
          href: '#'
        }, i({
          className: 'icon-settings'
        }), i({
          className: 'icon-mini-arrow-down'
        })), ul({
          id: 'content-1',
          className: 'al-options',
          role: 'menu',
          tabIndex: '0',
          'aria-hidden': 'true',
          'aria-expanded': 'false',
          'aria-activedescendant': 'content-2'
        }, li({
          role: 'presentation'
        }, a({
          href: '#',
          className: 'icon-edit',
          id: 'content-2',
          tabIndex: '-1',
          role: 'menuitem',
          title: 'Edit'
        }, 'Edit')), li({
          role: 'presentation'
        }, a({
          href: '#',
          className: 'icon-trash',
          id: 'content-3',
          tabIndex: '-1',
          role: 'menuitem',
          title: 'Delete this module'
        }, 'Delete'))))))));
      })
    });
  });

}).call(this);
