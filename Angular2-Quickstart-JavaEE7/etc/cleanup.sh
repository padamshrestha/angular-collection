#!/bin/sh

#===================================================================
#
# 		                  -- VERSION 1.0.0  --
#
#	            Clean up all "node_modules" and "dist" folders.
#
#   Example command:
#     ./node-cleanup.sh
#
#    ::::::::::::::: www.blogging-it.com :::::::::::::::
#
# Copyright (C) 2017 Markus Eschenbach. All rights reserved.
#
#
# This software is provided on an "as-is" basis, without any express or implied warranty.
# In no event shall the author be held liable for any damages arising from the
# use of this software.
#
# Permission is granted to anyone to use this software for any purpose,
# including commercial applications, and to alter and redistribute it,
# provided that the following conditions are met:
#
# 1. All redistributions of source code files must retain all copyright
#    notices that are currently in place, and this list of conditions without
#    modification.
#
# 2. All redistributions in binary form must retain all occurrences of the
#    above copyright notice and web site addresses that are currently in
#    place (for example, in the About boxes).
#
# 3. The origin of this software must not be misrepresented; you must not
#    claim that you wrote the original software. If you use this software to
#    distribute a product, an acknowledgment in the product documentation
#    would be appreciated but is not required.
#
# 4. Modified versions in source or binary form must be plainly marked as
#    such, and must not be misrepresented as being the original software.
#
#    ::::::::::::::: www.blogging-it.com :::::::::::::::
#===================================================================

#===================================================================
#	SETTINGS
#===================================================================
BASE_DIR="$(dirname $0)"
SCRIPT_DIR="$( cd -P -- "$(dirname -- "$(command -v -- "$0")")" && pwd -P )"
WORK_DIR="$SCRIPT_DIR/.."

#===================================================================
#	FUNCTIONS
#===================================================================

function doRemoveDir() {
  printf "remove '$1' directories..."
  find . -name $1 -type d -exec rm -rf '{}' +
  printf "done\n"
}

#===================================================================
#	MAIN
#===================================================================

cd $WORK_DIR

doRemoveDir 'dist'
doRemoveDir 'doc'
doRemoveDir 'compiled'
doRemoveDir 'coverage'
doRemoveDir 'dll'
doRemoveDir 'node_modules'
doRemoveDir 'target'
doRemoveDir 'build-tools'

exit 0



