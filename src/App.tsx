import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { DemoFeatures } from "./components/features/demo/DemoFeatures";
import { ComponentLibrary } from "./components/showcase/ComponentLibrary";

const App: Component = () => {
	return (
		<Router>
			<Route path="/" component={DemoFeatures} />
			<Route path="/components" component={ComponentLibrary} />
		</Router>
	);
};

export default App;
