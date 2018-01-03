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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Observer = function () {
    function Observer() {
        _classCallCheck(this, Observer);

        this.listeners = {};
    }

    _createClass(Observer, [{
        key: "addListener",
        value: function addListener(event, callback) {
            (this.listeners[event] = this.listeners[event] || []).push(callback);
        }
    }, {
        key: "emitEvent",
        value: function emitEvent(event, data) {
            this.listeners[event].forEach(function (callback) {
                callback(data);
            });
        }
    }]);

    return Observer;
}();

var observer = new Observer();

var UserTable = function UserTable(_ref) {
    var allTime = _ref.allTime,
        users = _ref.users;

    return React.createElement(
        "table",
        {className: "table table-striped"},
        React.createElement(TableHead, {allTime: allTime}),
        React.createElement(
            "tbody",
            null,
            users.map(function (user, index) {
                return React.createElement(UserRow, {key: user.username, user: user, index: index});
            })
        )
    );
};

var TableHead = function TableHead(_ref2) {
    var allTime = _ref2.allTime;

    var sortRecents = function sortRecents() {
        observer.emitEvent("onSort", false);
    };

    var sortAll = function sortAll() {
        observer.emitEvent("onSort", true);
    };

    return React.createElement(
        "thead",
        null,
        React.createElement(
            "tr",
            null,
            React.createElement(
                "th",
                null,
                "#"
            ),
            React.createElement(
                "th",
                null,
                "Camper Name"
            ),
            React.createElement(
                "th",
                {className: allTime ? "" : "sorted", onClick: sortRecents},
                "30 days"
            ),
            React.createElement(
                "th",
                {className: allTime ? "sorted" : "", onClick: sortAll},
                "All time"
            )
        )
    );
};

var UserRow = function UserRow(_ref3) {
    var index = _ref3.index,
        user = _ref3.user;

    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            index + 1
        ),
        React.createElement(
            "td",
            null,
            React.createElement(
                "a",
                {
                    href: "https://www.freecodecamp.com/" + user.username,
                    target: "_blank"
                },
                React.createElement("img", {src: user.img}),
                React.createElement(
                    "span",
                    null,
                    user.username
                )
            )
        ),
        React.createElement(
            "td",
            null,
            user.recent
        ),
        React.createElement(
            "td",
            null,
            user.alltime
        )
    );
};

var PageFooter = function PageFooter() {
    return React.createElement(
        "footer",
        null,
        "by ",
        React.createElement(
            "a",
            {href: "https://codepen.io/alexcarvalho/", target: "_blank"},
            "Al\xE9x Carvalho"
        )
    );
};

var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.state = {users: [], allTime: false};
        return _this;
    }

    _createClass(Container, [{
        key: "loadData",
        value: function loadData() {
            var _this2 = this;

            var baseUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/";
            axios.get("" + baseUrl + (this.state.allTime ? "alltime" : "recent")).then(function (response) {
                return _this2.setState({users: response.data});
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            observer.addListener("onSort", function (allTime) {
                if (allTime != _this3.state.allTime) {
                    _this3.setState({allTime: allTime}, _this3.loadData);
                }
            });

            this.loadData();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                {className: "container"},
                React.createElement(
                    "h1",
                    null,
                    "freeCodeCamp Leaderboard"
                ),
                React.createElement(UserTable, {allTime: this.state.allTime, users: this.state.users}),
                React.createElement(PageFooter, null)
            );
        }
    }]);

    return Container;
}(React.Component);

ReactDOM.render(React.createElement(Container, null), document.getElementById("root"));