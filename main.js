const express = require('express');
const WP = require('wp-cli');
const axios = require('axios');
const app = express();


const options = {
    "path": "/srv/http/",
}
app.post('/createSite', function (req, res) {
    const slug = req.query.slug
    const title = req.query.title
    const email = 'kevinabadromero@gmail.com'
    
   

    WP.discover(options, function(WP){
        WP.site.create({"slug": slug, "title": title, "email": email}, (err, result)=>{
            console.log(result)
        })

        
    })  
});

app.post('/updateSite', function(req, res){
    const id = req.query.id
    const newSlug = req.query.newSlug
    const adminEmail = "kevinabadromero@gmail.com"
    axios.update('localhost/index.php/wp-json/wp/v2/sites/update\?blog_id='+id+'&\domain\='+newSlug+'\&admin_email\='+adminEmail, null, {
        Headers:{
            Authorization:""
        }
    }).then((resp)=>{
        res.send(resp)
    }).catch((err)=>{
        res.send(err)
    })
    

})

app.post('/deleteSite', function(req, res){
    id = req.query.id

    WP.discover(options, function(WP){
        WP.site.delete(id, {'yes': true}, (err, result)=>{
            console.log(err)
            console.log(result)
            res.send(result)
        })
    })
})


app.post('/installTheme', function (req, res) {  
    const domain = req.query.domain
    

    WP.discover(options, function(WP){
        WP.theme.install("neve", {"activate": true, "url": domain}, (err, result)=>{
            console.log(err)
            console.log(result)
        })
    })
});


app.post('/installTemplator', function (req, res){
    const domain = req.query.domain
    const response = []
    
    
    WP.discover(options, async function(WP){
        
        await WP.plugin.install("elementor templates-patterns-collection", {"activate": true, "url": domain}, (err, result)=>{
            res.sendStatus(result)            
            
        })
        

    })
})



app.post('/importTemplate', function (req, res) {
    const domain = req.query.domain
    const kitName = req.query.kitName

    WP.discover(options, function(WP){
        WP.themeislesi.import(kitName, {"url": domain}, (err, result)=>{
            console.log(err)
            console.log(result)
            res.send(result)
        })
    })
    
  
  
  //res.send('[GET]Saludos desde express');
});

app.post('/seeTemplates', function (req, res) {
    const domain = req.query.domain
    const options = {
        "path": "/srv/http/",
        "url": "amazon.localhost"
    }
    WP.discover(options, function(WP){
        WP.themeislesi.list({"field": "slug", "url": domain}, (err, result)=>{
            console.log(result)
            console.log(err)
            
            res.send(result)
        })
    })
    
  
  
  //res.send('[GET]Saludos desde express');
});


app.post('/inputUser', function (req, res) {
  
  const userLogin = req.query.userLogin
  const userEmail = req.query.userEmail
  const user = userLogin+" "+userEmail
  const userPass = req.query.userPass
  const domain = req.query.domain
  const options = {
    "path": "/srv/http/",
  }
  WP.discover(options, function(WP){
    WP.user.create(user, {"user_pass": userPass, "role": "editor", "url": domain}, (err, result)=>{
        console.log(result)
        console.log(err)
        
        res.send(result)
    })
})

  
  
  
});

app.post('/maintenanceMode', function (req, res) {
    
    const domain = req.query.domain
  
    WP.discover(options, function(WP){
        WP.maintenance_mode.activate({"url": domain}, (err, result)=>{
            console.log(result)
            console.log(err)
            
            res.send(result)
        })
    })
    
});

app.put('/maintenanceMode', function (req, res) {
    
    const domain = req.query.domain
  
    WP.discover(options, function(WP){
        WP.maintenance_mode.deactivate({"url": domain}, (err, result)=>{
            console.log(result)
            console.log(err)
            
            res.send(result)
        })
    })
    
});

app.post('/addPlugins', function(req, res){
    const domain = req.query.domain
    const plugin = req.query.plugin
    
    WP.discover(options, async function(WP){
        
        await WP.plugin.install(plugin, {"activate": true, "url": domain}, (err, result)=>{
            res.send(result)            
            
        })
        

    })    
})




app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});