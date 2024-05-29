# This bash script allows us to read in enviroment variables right at the starting of the container

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js

# Loop through all environment variables
printenv | while read -r line || [[ -n "$line" ]]; do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')

    # Append configuration property to JS file
    echo "  $varname: \"$varvalue\"," >> ./env-config.js
  fi
done

echo "}" >> ./env-config.js