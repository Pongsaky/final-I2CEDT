import json

name = []
nums = []

with open("text.txt", "r") as file:
    lines = file.readlines()
    for line in lines:
        line = line.strip()
        if line.isnumeric():
            nums.append(line)
        else:
            name.append(line)

sublist_size = 4
sublists = [nums[i : i + sublist_size] for i in range(0, len(nums), sublist_size)]

res = []
for i in range(len(name)):
    temp = {"exercise": name[i], "calories": sublists[i]}
    res.append(temp)

Dict = {"exercise 1 hour": res}
with open("calories burned.json", "w") as outfile:
    json.dump(Dict, outfile)
