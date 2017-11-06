/**
 * Mail
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var Message = require('models/message');

	/**
	 * @class MessageCollection
	 */
	var MessageCollection = Backbone.Collection.extend({
		model: Message,
		comparator: function(message) {
			return message.get('dateInt') * -1;
		},
		initialize: function() {
			this.on('add', this._fetchAvatar);
		},

		_fetchAvatar: function(message) {
			var url = OC.generateUrl('/apps/mail/api/avatars/url/{email}', {
				email: message.get('fromEmail')
			});

			Promise.resolve($.ajax(url)).then(function() {
				message.set('senderImage', OC.generateUrl('/apps/mail/api/avatars/image/{email}', {
					email: message.get('fromEmail')
				}));
			}).catch(console.error.bind(this));
		}
	});

	return MessageCollection;
});
