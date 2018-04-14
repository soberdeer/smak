<Router>
    <Switch>
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/work" component = {Work} />
        <Route exact path = "/about" component = {About} />
        <Route exact path = "/projects" component = {Projects} />
        <Route exact path = "/contact" component = {Contact} />
        <Route component = {NotFound} />
    </Switch>
</Router>
