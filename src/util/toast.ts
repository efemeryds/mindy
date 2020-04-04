export function toast(message: string, duration = 3000){
    const toas = document.createElement('ion-toast');
    toas.message = message;
    toas.duration = duration;

    document.body.appendChild(toas);
    return toas.present();
}