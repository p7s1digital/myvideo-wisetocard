function(doc, req) {
  // !json templates.storycard
  // !code vendor/couchapp/template.js

  return tmpl(templates.storycard,{
    number: "1",
    title: "sdsd",
    description: "Eine Beschreibung muss sein"
  });

}
