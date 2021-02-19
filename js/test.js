let button;
let checkbox;

scene = 0;
file_id = 0;
ffile_id = 0;
tracking_id = 0;
fr = 5;  // 30
mini = 10;
maxi = 90;
agenum = Math.floor(Math.random() * (maxi + 1 - mini)) + mini;
midarr = [];
Lastarr = [];
filearr = [];

// smallarr = [];
// arr = [];
// num = 0;

// for(i = 0; i < file_id; i++){
//     arr+num
//     saveJSON(json, arr + i + '.json');
// }

function setup() {
    width = 500.00000
    height = 500.00000
    createCanvas(width, height);
    background(200);
    text('double click to reset', 10, 10);
    button = createButton("save");
    button.mousePressed(savedata);
    // checkbox = createCheckbox('record', false);
    // checkbox.changed(recordmode);
}

function draw() {
    frameRate(fr);
    text("scene" + str(scene), 10, 50);
    //text("file_id" + str(file_id), 10, 70);
    //print(file_id);
    if (scene == 1) {
        let json = {}; // new  JSON Object
        fill('#000000');
        ellipse(mouseX, mouseY, 5, 5);
        json.age = agenum;
        json.camera_id = 1;
        json.emotion = 1;
        json.gender = -1;
        json.is_staff = false;
        json.tracking_id = tracking_id;
        json.world_x = mouseX / width;
        json.world_y = mouseY / height;
        //saveJSON(json, file_id + '.json');
        //print(json.world_x);
        //print(json);
        arr.push(json);
        //print(arr);

        // for (i = 0; i < file_id; i++) {
        //     Lastarr = arr.slice(i, i + 1);
        // }


        // for (i = 0; i < ffile_id; i++) {
        //     Lastarr = arr.slice(i, i + 1);
        //     //print(Lastarr);
        //     saveJSON(Lastarr, i + '.json');
        //     Lastarr = [];
        // }


        file_id = file_id + 1;

        //smallarr + file_id

    }

}


function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        scene = 1;
        // age random
        agenum = Math.floor(Math.random() * (maxi + 1 - mini)) + mini;
        file_id = 0;
        arr = [];
    } else if (keyCode === LEFT_ARROW) {
        //print(Barr);
        scene = 0;
        tracking_id = tracking_id + 1;
        filearr.push(file_id);
        midarr.push(arr);
        print(midarr);
    }
}

// function mousePressed() {
//     if (checkbox == true){
//         scene = 1;
//         // age random
//         agenum = Math.floor(Math.random() * (maxi + 1 - mini)) + mini;
//         arr = [];
//         file_id = 0;
//     }
// }

// function mouseReleased() {
//     if (checkbox == true) {
//         print("a");
//         scene = 0;
//         tracking_id = tracking_id + 1;
//         filearr.push(file_id);
//     }
// }

// function recordmode() {
//     if (mouseIsPressed) {
//         scene = 1;
//         // age random
//         agenum = Math.floor(Math.random() * (maxi + 1 - mini)) + mini;
//         arr = [];
//         file_id = 0;
//         tracking_id = tracking_id + 1;
//     } else {
//         //print(Barr);
//         scene = 0;

//         filearr.push(file_id);
//     }
// }



function savedata() {
    hoge = [];
    ffile_id = Math.max.apply(null, filearr);
    print(ffile_id)
    for (j = 0; j < ffile_id; j++) {
        for (i = 0; i < tracking_id; i++) {
            hoge = midarr.slice(i, i + 1);
            print('1')
            print(hoge);
            Lastarr = hoge.slice(j, j + 1);
            print('2')
            print(Lastarr);
        }
        //print(Lastarr);
        saveJSON(Lastarr, j + '.json');
        Lastarr = [];
    }
}


//ドラッグ
function mouseDragged() {
    fill('#00ffff');
    ellipse(mouseX, mouseY, 5, 5);

}

//Wクリック
function doubleClicked() {
    //背景リセット
    background(200);
    fill('#000000');
    text('double click to reset', 10, 10);
    tracking_id = 0;
}


// for(i = 0; i < file_id; i++){
//     let json = {};
// }




/*
age : 10 ~ 90 （ランダム値）
camera_id ; 1（固定で良い）
emotion: 1 （固定で良い）
gender: -1 (固定で良い）
is_staff: false (固定で良い）
tracking_id : 0 ~ 100 (人のIDなので、一人目は０、二人目は１みたいな形）
world_x: 0 ~ 1 (正規化されたデータ。小数点は第5位まで）
world_y: 0 ~ 1 (正規化されたデータ。小数点は第５位まで）

*/