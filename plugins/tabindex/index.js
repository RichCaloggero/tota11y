/**
 * A plugin to annotate all elements with positive tabindex values.
*/

let $ = require("jquery");
let Plugin = require("../base");
let annotate = require("../shared/annotate")("tabindex");

class TabindexPlugin extends Plugin {
    getTitle() {
        return "Tabindex";
    }

    getDescription() {
        return "Annotates elements with positive tabindex values";
    }

    reportError(el) {
        let $el = $(el);
        let tabindexValue = $el.attr("tabindex");
        let title = "Element contains tabindex attribute with positive value";
        let $error = (
            <div>
                <p>Elements with positive tabindex values cause the order in which elements appear in the browser's tab order to diverge from DOM order.
                Screen reader's reading commands read elements in DOM order; using positive tabindex values thus causes the browser's tab (nextElement) command to present different results than the screen reader's (nextElement) command.
            </p></div>
        );

        // Place an error label on the element and register it as an
        // error in the info panel
        let entry = this.error(title, $error, $el);
        annotate.errorLabel($el, "", title, entry);
    }

    run() {
        var self = this;
$("[tabindex]:not(.tota11y-toolbar,.tota11y-plugin)").each (function () {
if (Number($(this).attr("tabindex")) > 0) {
self.reportError (this);
            } // if
}); // each
} // run

    cleanup() {
        annotate.removeAll();
    }
}

module.exports = TabindexPlugin;
