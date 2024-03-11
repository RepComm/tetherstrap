

/**
 * @typedef {import("./types")}
 */

const db = {
  /**@type {IDBDatabase}*/
  ctx: undefined,
  /**@type {IDBObjectStore}*/
  fillStore: undefined,
  init () {
    return new Promise((resolve, reject)=>{
      const req = indexedDB.open("tetherstrap");
      
      req.onerror = (evt)=>{
        reject(evt);
        return;
      }
      
      req.onupgradeneeded = (evt)=>{
        /**@type {IDBDatabase}*/
        db.ctx = evt.target.result;
        db.fillStore = db.ctx.createObjectStore("fills", {
          autoIncrement: true
        });

        db.fillStore.createIndex("origin", "origin", {
          unique: false
        });
        db.fillStore.createIndex("path", "path", {
          unique: false
        });
        db.fillStore.transaction.oncomplete = (evt)=>{
          resolve();
          return;
        }
      }

      // req.onsuccess = (evt)=>{
      //   resolve();
      // }
      
    })
  },
  /**
   * @param {string} origin
  */
  getFillsByOrigin(origin) {
    return new Promise((resolve, reject)=>{
      db.fillStore.index("origin").openCursor().onsuccess = (evt)=>{
        /**@type {IDBCursor}*/
        const cursor = evt.target.result;
        
        if (!cursor) {
          reject("could not create cursor");
          return;
        }

        
      }
    });
  }
};

async function main () {
  console.log("sw.js");

  await db.init();

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
      // appendFillsFromOrigin(origin, origins[origin]);
    }
  }
}
  chrome.runtime.onMessage.addListener(onMsg);
}

main();