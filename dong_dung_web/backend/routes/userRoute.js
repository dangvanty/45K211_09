



router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);