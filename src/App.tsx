import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { ComponentLibrary } from "./components/showcase/ComponentLibrary";
import { FeatureShowcase } from "./components/features/demo/FeatureShowcase";

const App: Component = () => {
	return (
		<Router>
			<Route path="/" component={FeatureShowcase} />
			<Route path="/components" component={ComponentLibrary} />
		</Router>
	);
};

export default App;
