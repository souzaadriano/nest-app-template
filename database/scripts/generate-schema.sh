mkdir -p ./database/models/temp

for file in ./database/models/*.prisma; do
    sed '/\/\/@relations/,$d' "$file" > "./database/models/temp/$(basename "$file")"
done

cat ./database/models/connection.config ./database/models/temp/*.prisma > ./database/schema.prisma
rm -rf ./database/models/temp
yarn format:schema