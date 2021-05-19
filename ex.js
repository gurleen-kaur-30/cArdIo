var obj =  {
    '0': {
      count: 0,
      uid: 'dsWMR00bzBei3jKofmMxutiijFf2',
      created: '2021-05-19T13:06:04.972Z'
    },
    '1' : {
        count: 0,
        uid: 'dsWMR00bzBei3jKofmMxutiijFf2',
        created: '2021-05-19T13:06:04.972Z'
    }
  }

const arrayOfObj = Object.entries(obj).map((e) => ( e[1]  ));
  
console.log(arrayOfObj)

console.log("timeee", new Date().getHours(), new Date().getMinutes())
