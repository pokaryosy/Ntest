//----
// global variables
// 変わらないものはconst, 変わるものはlet

// jsonデータに関連する変数
const ageMin = 10; // min, maxはp5.jsのデフォルト関数とバッティングするので避ける
const ageMax = 90;
const agenum = Math.floor(Math.random() * (ageMax + 1 - ageMin)) + ageMin;
let records = [];
let currentRecord = [];

// 描画に関連する変数
const width = 500;
const height = 500;
const bg_normal_color = "#999";
const bg_record_color = "#222";
let scene = 0;



const walkmax = 10;
const walkmin = -10;
let walknum = 0;
let paststepX = 0;
let paststepY = 0;
let newstepX = 0;
let newstepY = 0;
let nextX = 0;
let nextY = 0;
let ranx = Math.floor( Math.random() * (width + 1 - 0) ) + 0;
let rany = Math.floor( Math.random() * (height + 1 - 0) ) + 0;
let direction = 0;




//------
// 積極的にまとまった処理は関数にする
// 同じ処理が複数の場所で発生したら関数にする必要あり
// -----

// 点を記録する関数(currentRecordに記録)
// currentRecordは、[{}, {}, {} ,,,,,]といった感じで
// objの配列
function recordPoint(x, y) {
    let record = {}
    record.age = agenum;
    record.camera_id = 1;
    record.emotion = 1;
    record.gender = -1;
    record.is_staff = false;
    record.tracking_id = 0;
    record.world_x = x / width;
    record.world_y = y / height;
    currentRecord.push(record);
}

// currentRecordにあるものを、recordsに追加する関数
// recordsは, [[{}, {}, {}], [{}, {}, {}]]といった感じで
// currentRecordsが複数入ってる配列
function appendToBuffer() {
    print("appendToBuffer");
    records.push(currentRecord);
    currentRecord = [];
}

// recordsを処理して、jsonに吐き出す(1人のときも複数人のときも対応)
function saveDataToJson() {
    print("saveDataToJson");

    const peopleNum = records.length; // 何人分の記録があるか
    // データがなかったらreturn
    if (peopleNum == 0) return;

    const lengthArray = records.map(r => r.length);
    print(lengthArray)
    const maxFrameLength = max(lengthArray); // recordsにある一人ひとりの記録のなかで、最大の長さを算出
    print("maxLength : " + maxFrameLength);


    for (let fr=0; fr<maxFrameLength; fr++) {
        let saveArray = []; // ファイルに出力するデータの初期化. saveするデータは、一人分の記録のときは[{}], 複数人のときは、[{}, {}, {}]という形なので、空の配列を用意しておく

        for (let p=0; p<peopleNum; p++) {
            // すでにフレームが終わってたらループを抜ける
            if (fr >= records[p].length) continue;

            const bufferObj = records[p][fr];
            saveArray.push(bufferObj);
        }

        const timestamp = str(month()) + str(day()) + str(hour()) + str(minute()); // ファイルが重複しないようにタイムスタンプつける. あとでpythoのスクリプトとかで消せば良い
        const filename = "./" + timestamp + "-" + (fr+1) + ".json";
        console.log(filename)
        saveJSON(saveArray, filename); // saveJSONはarrayかobjをファイルとして出力できる
    }
}


//--------------
// main
//------------
function setup() {
    createCanvas(width, height);
    frameRate(30);
}

function draw() {
    
    const bg_color = scene == 1 ? bg_record_color : bg_normal_color;
    background(bg_color);


    // text
    const text_color = scene == 1 ? "#fff" : "#000";
    fill(text_color);
    text('r : SWITCH TO RECORD MODE', 5, 15);
    text("c : CLEAR", 5, 30);
    text("a : APPEND RECORD TO BUFFER", 5, 45);
    text("s : SAVE BUFFER TO JSON", 5, 60);
    const sceneInfo = scene == 1 ? "RECORD" : "NORMAL";
    text("MODE: " + sceneInfo, 400, 15);
    const recordInfo = "CURRENT RECORD" + currentRecord.length + " frame";
    text(recordInfo, 5, 465);
    const bufferInfo = "PEOPLE NUM " + records.length;
    text(bufferInfo, 5, 480);
    
    // ---
    // 描画系
    //----

    let c; // color
    if (scene == 1) {
        c = "#f00";
    } else if (scene == 0) {
        c = "#000";
    }

    fill(c);
    noStroke();
    currentRecord.forEach((record) => {
        ellipse(record.world_x * width, record.world_y * height, 5, 5);
    })

    // ---
    // 処理系 
    // ---
    
    
    //recordPoint(mouseX, mouseY);
  
    // if(walknum%2 == 0){
    // rany = ranx + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    // } else {
    // ranx = rany + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    // }
  
    
  if (direction === 0){
    
    // vertical move
    
    if(walknum === 0){
      
    // 1st step
    ranx = ranx + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    rany = rany + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    
    
    }else if(walknum === 1){
    
    // 2nd step
    ranx = newstepX + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    rany = newstepY + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    
    }else if(walknum === 2){
    
    //3rd step
    nextX = newstepX - paststepX;
    nextY = newstepY - paststepY;
    ranx = paststepX;
    rany = rany + nextY;
    
    }else if(walknum >= 3){
    
    //4h step
    ranx = paststepX;
    rany = rany + nextY;
    
    }

  }else{
    
    // horizontal move
  
    if(walknum === 0){
      
    // 1st step
    ranx = ranx + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    rany = rany + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    
    
    }else if(walknum === 1){
    
    // 2nd step
    ranx = newstepX + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    rany = newstepY + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    
    }else if(walknum === 2){
    
    //3rd step
    nextX = newstepX - paststepX;
    nextY = newstepY - paststepY;
    ranx = ranx + nextX;
    rany = paststepY;
    
    }else if(walknum >= 3){
    
    //4h step
    ranx = ranx + nextX;
    rany = paststepY;
    
    }
      
  }
  
  
    //per 5 steps
    if(walknum%10 === 0 && walknum>0){
      ranx = newstepX + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
      rany = newstepY + Math.floor( Math.random() * (walkmax + 1 - walkmin) ) + walkmin;
    
    }
  
    
    paststepX = newstepX;
    paststepY = newstepY;
    newstepX = ranx;
    newstepY = rany;
    direction = Math.floor( Math.random() * (1 + 1 - 0) ) + 0;
  
    walknum++;
    
    recordPoint(ranx,rany);
    if (scene == 0 && currentRecord.length > 5000) currentRecord = []; // scene0なのにcurrentRecordgaいっぱいになったらクリアしておく
}


function keyPressed() {
    if (keyCode === RIGHT_ARROW || key=="r") {
        if (scene != 1) { // すでにscene1になっていたら何も起こらないように
            currentRecord = [];
            scene = 1;
        }
    } else if (keyCode === LEFT_ARROW || key == "c") {
        reset()
    } else if (key == "a") {
        appendToBuffer();
        scene = 0;
    } else if (key == "s") {
        saveDataToJson(records, "test.json")
        reset();
    }
}

function doubleClicked() {
    reset();
}

function reset() {
    scene = 0;
    records = [];
    currentRecord = [];
}