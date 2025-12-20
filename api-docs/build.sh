rm -rf ./.cache/framework || {
  echo "Failed to remove cache directory"
}

# Ge the bow framework source
[ -d ./framework ] || mkdir .cache

[ -d ./framework ] || git clone https://github.com/bowphp/framework ./.cache/framework

# Install the doctum if not exists
[ -f ./doctum.phar ] || curl -O https://doctum.long-term.support/releases/latest/doctum.phar

# Build the api docs base on define configuration
php doctum.phar update config.php 2>/dev/null || true