const filterAndTrim = (arr) => {
  const filteredArr = arr.filter((line) => line.trim() !== "");
  const newArr = filteredArr.map((line) => line.trim());
  return newArr;
};

const natPolicy = block => {
  return [
    `nat-policy ${block.slice(6, 14).join(" ")}`,
    `${block[2]}`,
    `${block[4]}`,
    'exit',
    `${block[3]} ${block[5]} ${block[14]}`
  ];
};

const accessRule = block => {
  console.log(block)
  const code = [];
  code.push(
    `access-rule ${block.slice(4, 11).join(" ")}`,
    `${block[2]}`,
    `${block[14]}`,
    `${block[10]}`,
    `${block[3]}`,
  );
  for(let i = 11; i < block.length; i++){
    code.push(block[i]);
  };
  code.push('exit');
  return code;
};

const format = (arr) => {
  let code = [];
  for (let block of arr) {
    let action = block[0].replace(/ .*/, "");
    switch (action) {
      case "nat-policy":
        code.push(natPolicy(block));
        break;
      case "access-rule":
        code.push(accessRule(block));
        break;
      default:
        break;
    }
  }
  return code;
};

const onSubmit = (e) => {
  e.preventDefault();
  const arr = [];
  let output = "";
  const input = e.target.name.value;
  const mainArr = input.split("exit");
  const filteredBlocks = filterAndTrim(mainArr);
  for (let block of filteredBlocks) {
    arr.push(filterAndTrim(block.split("\n")));
  }
  const items = format(arr);
  for (let item of items) {
    output = output === "" ? item.join(" <br> ") : output.concat(item.join(" <br> "));
    output = output.concat("<br><br>");
  }
  outputDiv.innerHTML = output;
};

const outputDiv = document.getElementById("output");

const submit = document
  .getElementById("form")
  .addEventListener("submit", onSubmit);
