import express from 'express'
import path from 'path'

const app = express();
app.use(express.static(path.join(__dirname, '/build')));
const fetch = require("node-fetch");

app.get('/api/guardian/search', (req, res) => {
    
    const qName = req.query.q;
    
    let uri = '';
    uri = 'https://content.guardianapis.com/search?q='
    uri+= qName
    uri+='&api-key=7ea8504b-a7a5-462d-bf01-5d1aad101c16&show-blocks=all'

    var url = encodeURI(uri); 
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
        res.send(json);
    });
    
})


app.get('/api/guardian/article', (req, res) => {
    
    const idName = req.query.id;
    
    let uri = '';
    uri = 'https://content.guardianapis.com/'
    uri+= idName
    uri+='?api-key=7ea8504b-a7a5-462d-bf01-5d1aad101c16&show-blocks=all'

    var url = encodeURI(uri); 
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
        res.send(json);
    });
    
})

app.get('/api/guardian/:section', (req, res) => {
    
    const sectionName = req.params.section;
    let url = '';
   
    
   if (sectionName === 'home') {
      url = 'https://content.guardianapis.com/search?api-key=7ea8504b-a7a5-462d-bf01-5d1aad101c16&section=(sport|business|technology|politics)&show-blocks=all';

   }else {
      url = 'https://content.guardianapis.com/'
      url += sectionName
      url +='?api-key=7ea8504b-a7a5-462d-bf01-5d1aad101c16&show-blocks=all';

   }

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
        res.send(json);
    });
    
})

app.get('/api/nytime/search', (req, res) => {
    
    
    const qName =  req.query.q
    let url = '';
    url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='
    url += qName
    url +='&api-key=YpIJSeM5r6GELNFFkkqsO3NYRV1qTAAO'
   
    

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
        res.send(json);
    });
    
})

app.get('/api/nytime/article', (req, res) => {
    
    const idName =  req.query.id
    let url = '';
    url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:('
    url += '"'+idName+'"';
    url +=')&api-key=YpIJSeM5r6GELNFFkkqsO3NYRV1qTAAO'
   
    

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
        res.send(json);
    });
    
})

app.get('/api/nytime/:section', (req, res) => {
    
    const sectionName = req.params.section;
    let url = '';
   
    
   if (sectionName === 'home') {
      url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=YpIJSeM5r6GELNFFkkqsO3NYRV1qTAAO';

   }else {
      url = 'https://api.nytimes.com/svc/topstories/v2/'
      url += sectionName
      url +='.json?api-key=YpIJSeM5r6GELNFFkkqsO3NYRV1qTAAO';

   }

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
        res.send(json);
    });
    
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen(8000, () => console.log('ligh!S!'));