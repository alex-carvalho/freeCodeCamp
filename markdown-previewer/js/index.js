var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var demo = "# Markdown Previewer\n# Headers\n# H1\n## H2\n#### H4\n\n# Emphasis\nItalics, with *asterisks* or _underscores_.\n\nBold, with **asterisks** or __underscores__.\n\nStrikethrough, ~~Scratch this.~~\n\n# Lists\n1. First ordered list item\n2. Another item\n\n\n* Unordered list can use asterisks\n- Or minuses\n+ Or pluses";

var Editor = function Editor(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange;

    var onChangeEvent = function onChangeEvent(event) {
        onChange(event.target.value);
    };
    return React.createElement("textarea", {value: value, onChange: onChangeEvent});
};

var Preview = function Preview(_ref2) {
    var value = _ref2.value;

    var createMarkup = function createMarkup(content) {
        return {__html: marked(content, {sanitize: true})};
    };
    return React.createElement("span", {dangerouslySetInnerHTML: createMarkup(value)});
};

var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.state = {value: demo};
        return _this;
    }

    _createClass(Container, [{
        key: "update",
        value: function update(newValue) {
            this.setState({value: newValue});
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                {className: "container"},
                React.createElement(
                    "div",
                    {className: "col editor"},
                    React.createElement(Editor, {value: this.state.value, onChange: this.update.bind(this)})
                ),
                React.createElement(
                    "div",
                    {className: "col preview"},
                    React.createElement(Preview, {value: this.state.value})
                )
            );
        }
    }]);

    return Container;
}(React.Component);

ReactDOM.render(React.createElement(Container, null), document.getElementById("root"));