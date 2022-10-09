

/*
in db video_links are stored as :
  - https://instagram.com/p/CimCUYJpMZt/
  - https://instagram.com/reel/CimCUYJpMZt/

I converted these link urls to unique ids
  - https://instagram.com/p/CimCUYJpMZt/   to  CimCUYJpMZt
  - https://instagram.com/reel/CimCUYJpMZt/   to  CimCUYJpMZt

This we can do easily with python script

*/



// subset of data
// array of post unique ids
ids = [ 'CimCUYJpMZt', 'ChctwWBl10a', 'CikQiQyjCTG', 'CcBD6THPVF8', 'Cb9ro1ejBWb', 'CahtViil3aP', 'CaCnHN7NZw3', 'Cab803KjUo8', 'Cb-jdGoPt6c', 'CahQ-zvjxvf', 'Cb5ifmHB6bR', 'Cb-jXyVvxZj', 'Cb-jRgIvx6v', 'CaXh_i5PQZn', 'Cb-jMKlv2O3', 'Cbz0a8losjW',
'CgUejB0Ax-e', 'CcBD9BvPCFx', 'CaW9A6dpo9xn0Zb8LBIsJiUfMETorKhcl-m4Wo0']


// object to store data
dict = {}



async function populate(id,dict){




    body = document.getElementsByTagName('html')[0]

    body.innerHTML = ""

    url = "https://www.instagram.com/p/"+id+"/"
    console.log(url)
    response = await fetch(url)
    text = await response.text()
    body.innerHTML+=text

    metas = await document.getElementsByTagName('meta')

    value = ""

    for ( let i=0;i<metas.length;i++){
        if(metas[i].content.contains("instagram://media?id=")){
          value = metas[i].content
          break
        }
    }
    value = value.split("id=")[1]
    console.log(value)
    url = "https://i.instagram.com/api/v1/media/"+value+"/info/"
    if(value == undefined){
      return
    }
    dict[id] = url

}



// calling populate function to populate data

for(let i=0; i<ids.length; i++){
  if (dict[ids[i]]){
    continue
  }
  setTimeout(()=>{populate(ids[i],dict)},i*10000)

}


// This gave output as :

dict = {
    "CaheC0PLO_1": "https://i.instagram.com/api/v1/media/2783638179615141877/info/",
    "Cab9yKDvMn3": "https://i.instagram.com/api/v1/media/2782088922442549751/info/"

    "CimCUYJpMZt": "https://i.instagram.com/api/v1/media/2929038804065240685/info/",
    "ChctwWBl10a": "https://i.instagram.com/api/v1/media/2908400693651397914/info/",
    "CikQiQyjCTG": "https://i.instagram.com/api/v1/media/2928538380931966150/info/",
    "Cb9ro1ejBWb": "https://i.instagram.com/api/v1/media/2809593664748918171/info/",
    "CahtViil3aP": "https://i.instagram.com/api/v1/media/2783705436981261967/info/",
    "CaCnHN7NZw3": "https://i.instagram.com/api/v1/media/2774952340215929911/info/",
    "Cab803KjUo8": "https://i.instagram.com/api/v1/media/2782084710267701820/info/",
    "Cb5ifmHB6bR": "https://i.instagram.com/api/v1/media/2808427547447502545/info/",
    "CaXh_i5PQZn": "https://i.instagram.com/api/v1/media/2780840797253994087/info/",
    "Cbz0a8losjW": "https://i.instagram.com/api/v1/media/2806817542962858198/info/",
    "CgUejB0Ax-e": "https://i.instagram.com/api/v1/media/2888067609574711198/info/",
}


/*
!!! NOTE !!!
Below code need to be run on python
*/


/*
 Now this dict is unique_id : number_id_url
 I changed the dict and mapped it to :
 - campaign_id : number_id_url
 */


 from administrants.models import Campaigns
 output = {}
 for id in data.keys():
     obj = Campaigns.objects.get(video_link__contains=id)
     output[str(obj.id)] = data[id]

output = {
 "3716": 'https://i.instagram.com/api/v1/media/2783638179615141877/info/',
 "3697": 'https://i.instagram.com/api/v1/media/2782088922442549751/info/',
 "5652": 'https://i.instagram.com/api/v1/media/2809593664748918171/info/',
 "3698": 'https://i.instagram.com/api/v1/media/2783705436981261967/info/',
 "2115": 'https://i.instagram.com/api/v1/media/2774952340215929911/info/',
 "3717": 'https://i.instagram.com/api/v1/media/2782084710267701820/info/',
 "5268": 'https://i.instagram.com/api/v1/media/2808427547447502545/info/',
 "3701": 'https://i.instagram.com/api/v1/media/2780840797253994087/info/',
}
