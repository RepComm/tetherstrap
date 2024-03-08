
/**
 * @type {import("./types.d.ts")}
 */

/**@type {{
 * ctx: IDBDatabase
 * }}*/
const db = {
  ctx: undefined,
  init () {
    return new Promise((resolve, reject)=>{
      const req = indexedDB.open("tetherstrap");
      
      req.onerror = (evt)=>{
        reject(evt);
        return;
      }
      
      req.onsuccess = (evt)=>{
        db.ctx = req.result;
        resolve();
      }

    })
  }
};


async function main () {
  console.log("sw.js");

  await setFillsFromOrigin("about:blank", [{
    id: "test",
    origin: "about:blank",
    value: "Hello World"
  }]);
  
  const res = await getFillsFromOrigin("about:blank");
  console.log(res);



  /**
   * @param {Msg} msg
   */
  const onMsg = (msg, sender, respond)=>{
  if (msg.type === "save") {
    console.log("saving for content script", msg.save);
    
    const origins = {};
    for (const fill of msg.save) {
      let arr = origins[fill.origin];
      if (arr === undefined) {arr = []; origins[fill.origin] = arr;}
      arr.push(fill);
    }

    for (const origin in origins) {
      appendFillsFromOrigin(origin, origins[origin]);
    }
  }
}
  chrome.runtime.onMessage.addListener(onMsg);
}

main();