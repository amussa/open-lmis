./gradlew --stop
export PATH="/root/.nvm/versions/node/v9.11.2/bin:$PATH"
nohup ./gradlew build run -x test -x ':modules:migration:jar' -DlogHome='/tmp' --stacktrace &
tail -f nohup.out
