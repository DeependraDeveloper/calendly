import crypto from 'crypto';

function generateNeverRepeatingId() {
  // 1. Get current time in milliseconds and convert to base-36 (alphanumeric)
  const timestamp = Date.now().toString(36); 

  // 2. Get high-resolution fractional time (nanoseconds) to prevent collisions in the same millisecond
  const nanoTime = process.hrtime()[1].toString(36);

  // 3. Generate random alphanumeric characters for absolute safety across different servers
  const randomBytes = crypto.randomBytes(4).toString('hex'); 

  // Combine them together
  return `${timestamp}-${nanoTime}-${randomBytes}`;
}



let generated = [];

for(let i=1;i<=100000;i++){
    let r = generateNeverRepeatingId()
    generated.push(r)
}

console.log("total genertaed", generated.length);

let unqiue = [...new Set(generated)]; 
console.log(unqiue.length); 